import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Share,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { logger } from '../../../lib/logger';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Award, Download, CheckCircle } from 'lucide-react-native';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { haptics } from '../../../lib/haptics';
import { colors, spacing, typography, borderRadius } from '../../../lib/theme';
import { certificateService, Certificate } from '../../../services/certificateService';
import { courseService } from '../../../services/courseService';
import { useAuthStore } from '../../../stores/authStore';

export default function CertificateScreen() {
  const { courseId } = useLocalSearchParams<{ courseId: string }>();
  const { user } = useAuthStore();

  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [courseTitle, setCourseTitle] = useState('');
  const [completionStatus, setCompletionStatus] = useState<{
    isComplete: boolean;
    progressPercent: number;
  }>({ isComplete: false, progressPercent: 0 });

  useEffect(() => {
    void loadCertificateData();
  }, [courseId, user]);

  const loadCertificateData = async () => {
    if (!courseId || !user) return;

    setLoading(true);

    // Get course info
    const { course } = await courseService.getCourseWithModules(courseId);
    if (course) {
      setCourseTitle(course.title);
    }

    // Check completion status
    const status = await certificateService.checkCourseCompletion(user.id, courseId);
    setCompletionStatus({
      isComplete: status.isComplete,
      progressPercent: status.progressPercent,
    });

    // Get existing certificate if any
    const existingCert = await certificateService.getCertificate(user.id, courseId);
    setCertificate(existingCert);

    setLoading(false);
  };

  const handleGenerateCertificate = async () => {
    if (!user || !courseId) return;

    setGenerating(true);
    haptics.medium();

    const newCertificate = await certificateService.generateCertificate(
      user.id,
      courseId,
      user.full_name || 'Student',
      courseTitle
    );

    if (newCertificate) {
      setCertificate(newCertificate);
      haptics.success();
    } else {
      haptics.error();
    }

    setGenerating(false);
  };

  const handleShare = async () => {
    if (!certificate) return;

    haptics.light();

    try {
      await Share.share({
        message: `I just earned my "${certificate.course_title}" certificate from The Dark Mirror! Certificate #${certificate.certificate_number}`,
        title: 'My Certificate',
      });
    } catch (error) {
      logger.error('Error sharing:', error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.accent} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => {
            haptics.light();
            router.replace(`/(course)/${courseId}`);
          }}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <ArrowLeft size={24} color={colors.primary} />
        </Pressable>
        <Text style={styles.headerTitle}>Certificate</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {certificate ? (
          <>
            {/* Certificate Display */}
            <View style={styles.certificateContainer}>
              <View style={styles.certificate}>
                {/* Header decoration */}
                <View style={styles.certHeader}>
                  <View style={styles.certLogo}>
                    <Award size={32} color={colors.accent} />
                  </View>
                  <Text style={styles.certBrand}>THE DARK MIRROR</Text>
                </View>

                {/* Main content */}
                <Text style={styles.certTitle}>Certificate of Completion</Text>

                <Text style={styles.certPretext}>This certifies that</Text>
                <Text style={styles.certName}>{certificate.user_name}</Text>

                <Text style={styles.certPretext}>has successfully completed</Text>
                <Text style={styles.certCourse}>{certificate.course_title}</Text>

                <View style={styles.certDivider} />

                <View style={styles.certFooter}>
                  <View style={styles.certDetail}>
                    <Text style={styles.certLabel}>Date Issued</Text>
                    <Text style={styles.certValue}>
                      {certificateService.formatCertificateDate(certificate.issued_at)}
                    </Text>
                  </View>
                  <View style={styles.certDetail}>
                    <Text style={styles.certLabel}>Certificate ID</Text>
                    <Text style={styles.certValue}>{certificate.certificate_number}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Actions */}
            <View style={styles.actions}>
              <Button
                title="Share Certificate"
                onPress={handleShare}
                style={styles.shareButton}
              />

              <Pressable
                style={styles.downloadButton}
                onPress={() => {
                  haptics.light();
                  Alert.alert(
                    'Coming Soon',
                    'PDF download will be available in a future update. For now, you can share your certificate!',
                    [{ text: 'OK' }]
                  );
                }}
              >
                <Download size={20} color={colors.accent} />
                <Text style={styles.downloadText}>Download PDF</Text>
              </Pressable>
            </View>

            {/* Verification info */}
            <Card style={styles.verifyCard}>
              <View style={styles.verifyHeader}>
                <CheckCircle size={20} color={colors.success} />
                <Text style={styles.verifyTitle}>Verified Certificate</Text>
              </View>
              <Text style={styles.verifyText}>
                This certificate can be verified at darkmirror.app/verify using the certificate ID above.
              </Text>
            </Card>
          </>
        ) : completionStatus.isComplete ? (
          /* Ready to generate */
          <View style={styles.generateContainer}>
            <View style={styles.successIcon}>
              <Award size={56} color={colors.accent} />
            </View>
            <Text style={styles.generateTitle}>Course Complete!</Text>
            <Text style={styles.generateText}>
              Congratulations on completing {courseTitle}! You've earned a certificate.
            </Text>
            <Button
              title={generating ? 'Generating...' : 'Generate Certificate'}
              onPress={handleGenerateCertificate}
              loading={generating}
              style={styles.generateButton}
            />
          </View>
        ) : (
          /* Course not complete */
          <View style={styles.incompleteContainer}>
            <View style={styles.incompleteIcon}>
              <Award size={56} color={colors.tertiary} />
            </View>
            <Text style={styles.incompleteTitle}>Keep Going!</Text>
            <Text style={styles.incompleteText}>
              Complete all lessons to earn your certificate.
            </Text>

            {/* Progress bar */}
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${completionStatus.progressPercent}%` },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>
                {completionStatus.progressPercent}% Complete
              </Text>
            </View>

            <Button
              title="Continue Learning"
              onPress={() => router.push(`/(course)/${courseId}`)}
              style={styles.continueButton}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  // Certificate display
  certificateContainer: {
    alignItems: 'center',
  },
  certificate: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    borderWidth: 2,
    borderColor: colors.accent,
    alignItems: 'center',
  },
  certHeader: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  certLogo: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  certBrand: {
    fontSize: typography.xs,
    fontWeight: typography.bold,
    color: colors.accent,
    letterSpacing: 2,
  },
  certTitle: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  certPretext: {
    fontSize: typography.sm,
    color: colors.tertiary,
    marginBottom: spacing.xs,
  },
  certName: {
    fontSize: typography.xxl,
    fontWeight: typography.bold,
    color: colors.primary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  certCourse: {
    fontSize: typography.lg,
    fontWeight: typography.semibold,
    color: colors.accent,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  certDivider: {
    width: '80%',
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },
  certFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  certDetail: {
    alignItems: 'center',
  },
  certLabel: {
    fontSize: typography.xs,
    color: colors.tertiary,
    marginBottom: spacing.xs,
  },
  certValue: {
    fontSize: typography.sm,
    fontWeight: typography.medium,
    color: colors.primary,
  },
  // Actions
  actions: {
    gap: spacing.md,
  },
  shareButton: {
    width: '100%',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  downloadText: {
    fontSize: typography.md,
    fontWeight: typography.medium,
    color: colors.accent,
  },
  // Verify card
  verifyCard: {
    gap: spacing.sm,
  },
  verifyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  verifyTitle: {
    fontSize: typography.md,
    fontWeight: typography.semibold,
    color: colors.primary,
  },
  verifyText: {
    fontSize: typography.sm,
    color: colors.secondary,
    lineHeight: 20,
  },
  // Generate state
  generateContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  successIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  generateTitle: {
    fontSize: typography.xxl,
    fontWeight: typography.bold,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  generateText: {
    fontSize: typography.md,
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 24,
  },
  generateButton: {
    width: '100%',
  },
  // Incomplete state
  incompleteContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  incompleteIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  incompleteTitle: {
    fontSize: typography.xl,
    fontWeight: typography.bold,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  incompleteText: {
    fontSize: typography.md,
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  progressContainer: {
    width: '100%',
    marginBottom: spacing.xl,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: colors.surfaceElevated,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 4,
  },
  progressText: {
    fontSize: typography.sm,
    color: colors.secondary,
    textAlign: 'center',
  },
  continueButton: {
    width: '100%',
  },
});
